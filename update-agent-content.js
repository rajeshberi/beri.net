const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const newContent = `Most enterprise AI agents I see are glorified chatbots with better context. They can answer questions, they can summarize documents, and that's it. **Your users ask for help, get some advice, and then have to go do the actual work themselves.**

That's not an agent. That's a really expensive FAQ system.

Here's the gap: **Agents without skills can only tell you what to do. Agents with skills actually do it.**

If you're deploying AI agents for engineering teams, finance teams, sales teams — anyone who needs to *act*, not just chat — you need to give your agents skills. Let me show you how.

---

## What Are Agent Skills?

Think of skills as **executable functions** your AI agent can call. Instead of just generating text responses, your agent can:

- Execute Python code to analyze data
- Call APIs to create tickets, send emails, update databases  
- Query external systems (SQL, REST, GraphQL)
- Generate charts, manipulate spreadsheets, transform files
- Trigger workflows in other tools

**Example without skills:**
> **User:** "Create a ticket for the database migration and assign it to the data team."  
> **Agent:** "You should create a Jira ticket with the title 'Database Migration' and assign it to the data team. Make sure to include the migration plan in the description."

**Example with skills:**
> **User:** "Create a ticket for the database migration and assign it to the data team."  
> **Agent:** *[Calls create_jira_ticket API]* *[Fetches data team members]* *[Creates ticket with proper fields]*  
> "Done. I created ticket DATA-1247 and assigned it to Sarah (data team lead). I added the migration plan from last week's doc and linked the related infrastructure tickets. It's in your sprint backlog."

See the difference? One gives you instructions. The other does the work.

---

## Why This Matters for Enterprise

Every CTO I talk to is deploying AI agents. Most are doing it wrong. They're optimizing conversation quality — better prompts, RAG, memory — but **conversation isn't the bottleneck.**

The bottleneck is **what agents can actually do.**

Your finance team doesn't need an agent that explains how to run a variance report. They need an agent that:
- Pulls actual numbers from ERP systems
- Runs the calculations  
- Generates the report
- Emails it to stakeholders

Your engineering team doesn't need an agent that knows how to check system status. They need an agent that:
- Queries logs and metrics
- Analyzes errors
- Creates incident tickets
- Notifies on-call engineers

**Skills close the gap between "helpful advice" and "getting work done."**

---

## How Agent Skills Work (Architecture)

Here's the pattern that's becoming standard:

### 1. User Request → Skill Planning

When a user makes a request, the agent determines:
- Is this purely conversational? (no skills needed)
- Does this require data retrieval? (query skill)
- Does this require computation? (code execution skill)
- Does this require taking action? (workflow skill)

Most agents use the LLM itself for skill planning:

\`\`\`python
system_prompt = """
You are an AI agent with access to these skills:

- execute_python(code) - Run Python for calculations/data analysis
- query_database(sql) - Query the company database  
- call_api(endpoint, method, params) - Call internal APIs
- create_ticket(project, title, description, assignee) - Create Jira ticket
- send_email(to, subject, body) - Send email
- search_docs(query) - Search company documentation

When the user asks you to do something, decide:
1. Can you handle this with conversation alone?
2. Do you need to call one or more skills?
3. What order should you call them in?

Plan your approach, then execute the skills needed.
"""
\`\`\`

### 2. Skill Execution

When the agent decides it needs a skill, it calls the function:

\`\`\`python
# User: "What's our AWS spend this month and create a ticket if it's over budget"

# Agent plans: 
# 1. Query database for current spend + budget
# 2. Compare values
# 3. If over budget, create ticket

# Execute skill 1
spend_data = agent.call_skill("query_database", {
    "sql": """
        SELECT 
            SUM(cost) as current_spend,
            budget_amount
        FROM aws_billing 
        WHERE month = DATE_TRUNC('month', CURRENT_DATE)
    """
})
# Returns: {"current_spend": 91847.23, "budget": 85000}

# Agent analyzes result
over_budget = spend_data["current_spend"] > spend_data["budget"]
variance = spend_data["current_spend"] - spend_data["budget"]

# Execute skill 2 (conditional)
if over_budget:
    ticket = agent.call_skill("create_ticket", {
        "project": "INFRA",
        "title": f"AWS spend over budget by ${variance:,.2f}",
        "description": "Current spend: $91,847. Budget: $85,000. Variance: $6,847 (8% over).",
        "assignee": "cloud-team"
    })

# Generate response
response = f"AWS spend is at $91,847 this month — $6,847 over the $85K budget. I created ticket {ticket['key']} and assigned it to the cloud team."
\`\`\`

### 3. Sandboxed Execution

**Critical:** Skills run in isolated environments. You don't want user requests executing arbitrary code in production.

Common patterns:
- **Docker containers** for code execution (Python, JS, etc.)
- **Read-only database replicas** for queries
- **Rate-limited API proxies** for external calls  
- **Approval workflows** for high-risk actions (delete, deploy, spend money)

### 4. Multi-Step Workflows

The real power of skills is **chaining them together**:

\`\`\`python
# User: "Analyze last week's customer churn and email the summary to the exec team"

# Agent plans multi-step workflow:
workflow = [
    ("query_database", {"sql": "SELECT..."}),  # Get churn data
    ("execute_python", {"code": "..."}),       # Analyze patterns
    ("generate_chart", {"data": "...", "type": "funnel"}),  # Visualize
    ("send_email", {
        "to": "exec-team@company.com",
        "subject": "Weekly Churn Analysis",
        "body": "...",
        "attachments": ["churn_chart.png"]
    })
]

# Agent executes skills in sequence, passing outputs forward
for skill, params in workflow:
    result = agent.call_skill(skill, params)
    # Use result in next skill if needed
\`\`\`

---

## Common Agent Skill Patterns

From production deployments I've seen, here are the skill types that deliver 90% of the value:

### Pattern 1: Data Retrieval Skills

**Use case:** Answer questions with live data

**Skills:**
- \`query_database(sql)\` - Direct database access
- \`call_api(endpoint)\` - Fetch from APIs  
- \`execute_python(code)\` - Complex data analysis

**Example:**
> "Show me customers who churned in the last 30 days with >$50K ARR."

Agent queries CRM, runs analysis, returns actionable list.

### Pattern 2: Action Skills  

**Use case:** Actually do the work

**Skills:**
- \`create_ticket(project, details)\`
- \`send_email(to, subject, body)\`
- \`update_record(table, id, fields)\`  
- \`trigger_deployment(service, version)\`

**Example:**
> "Deploy version 2.3.1 to staging and notify the QA team."

Agent deploys, verifies, sends notification. All done.

### Pattern 3: Analysis Skills

**Use case:** Process data and generate insights

**Skills:**
- \`execute_python(code)\` - Custom analysis
- \`generate_chart(data, type)\` - Visualizations
- \`run_simulation(model, params)\` - What-if scenarios
- \`summarize_data(dataset, format)\` - Reports

**Example:**
> "If we increase pricing by 10%, what's the impact on churn?"

Agent runs the model, generates projections, visualizes results.

### Pattern 4: System Skills

**Use case:** Manage infrastructure and troubleshoot

**Skills:**
- \`query_logs(service, filters)\`
- \`check_metrics(service, metric)\`  
- \`restart_service(name)\` *(with approval)*
- \`run_diagnostic(system)\`

**Example:**
> "Why is checkout slow today?"

Agent checks metrics, scans logs, identifies root cause (connection pool exhausted), suggests fix.

---

## The Hard Part: Safe Code Execution

Letting an AI agent write and run code based on user input is risky. Here's how production systems handle it:

### Isolation Layers

1. **Separate execution environment**
   - Spin up fresh Docker container per execution
   - Kill container after (no state persistence)
   - Timeout after N seconds (prevent infinite loops)

2. **Restricted permissions**
   - No network access (unless explicitly allowed)
   - No file system writes
   - No subprocess spawning  
   - Memory + CPU limits enforced

3. **Approved libraries only**
   - Pre-installed packages (pandas, numpy, etc.)
   - No runtime \`pip install\`
   - Block dangerous imports (\`os\`, \`subprocess\`, \`socket\`)

### Example: Python Skill Sandbox

\`\`\`python
ALLOWED_IMPORTS = {'pandas', 'numpy', 'datetime', 'json', 'math', 'statistics'}

def execute_python_skill(code, timeout=10):
    # Validate imports
    tree = ast.parse(code)
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name not in ALLOWED_IMPORTS:
                    raise SecurityError(f"Import {alias.name} not allowed")
    
    # Run in isolated container  
    result = docker.run(
        image="python-agent-sandbox:latest",
        command=f"python -c '{code}'",
        mem_limit="512m",
        cpu_quota=50000,
        timeout=timeout,
        network_mode="none"
    )
    
    return result.stdout
\`\`\`

### Approval Gates

For high-risk skills, require human approval:

\`\`\`python
HIGH_RISK_SKILLS = [
    'delete_record',
    'deploy_code',
    'restart_service',
    'send_external_email',
    'spend_money'
]

def execute_skill(skill_name, params):
    if skill_name in HIGH_RISK_SKILLS:
        # Queue for approval
        approval_id = create_approval_request(
            skill=skill_name,
            params=params,
            user=current_user
        )
        
        # Notify approvers (Slack, email)
        notify_approvers(approval_id)
        
        return {
            "status": "pending_approval",
            "approval_id": approval_id,
            "message": "This action requires approval. Notified your manager."
        }
    
    # Execute immediately for safe skills
    return run_skill(skill_name, params)
\`\`\`

---

## Real-World Example: Engineering Agent

**Before (agent without skills):**
- User: "Check if the API is having issues"  
- Agent: "You should check the Datadog dashboard for error rates and review recent CloudWatch logs for exceptions."
- Engineer manually checks dashboards, searches logs, diagnoses issue.

**After (agent with skills):**
- User: "Check if the API is having issues"
- Agent:
  1. Calls \`check_metrics("api", "error_rate", "1h")\` → 8.2% (baseline: 0.5%)
  2. Calls \`query_logs("api", "level:error", "1h")\` → 234 DB connection timeouts
  3. Calls \`check_metrics("database", "connection_pool", "1h")\` → 95% utilization (high)
  4. Returns: "Yes — API error rate is 8.2% (16x normal). Root cause: database connection pool is exhausted (95% utilization). This started 47 minutes ago. I've created incident INC-4782 and paged the database team. Suggested fix: increase connection pool from 100 to 200."

**Impact:** Engineering manager estimates this saves the team **10-15 hours per week** on manual troubleshooting.

---

## Should You Add Skills?

Not every agent needs skills. Here's how to decide:

**You DON'T need skills if:**
- Agent is purely conversational (customer support, Q&A)
- Users just need information or advice  
- No actions to take (policy questions, documentation search)

**You DO need skills if:**
- Users need to pull live data (not static docs)
- Answers require computation or analysis
- Users need to take action based on the response  
- You're replacing manual workflows, not just providing information

**ROI check:** If your users spend >30% of their time on tasks the agent could automate with skills, skills pay for themselves in weeks.

---

## Implementation Checklist

Adding skills to your agent:

**1. Start with 3-5 high-value skills**
- Most-requested data pulls
- Highest-frequency manual tasks
- Validate demand before building 50 skills

**2. Build safety from day 1**
- Sandboxed code execution
- Approval gates for risky actions  
- Rate limits per user
- Audit logs for all skill calls

**3. Monitor skill usage**
- Which skills get called most?
- What's the failure rate?
- Are users getting value?
- Where do skills fail?

**4. Provide transparency**
- "Show me the code you ran"
- "Explain why you called this skill"  
- "Let me approve before executing"

**5. Iterate based on data**
- Add skills when users repeatedly do the same manual work
- Optimize slow skills
- Remove unused skills

---

## The Bottom Line

An agent without skills is just a smart chatbot.  
An agent with skills is a teammate who actually gets work done.

If you're building AI agents for teams that need to **act** — not just talk — stop optimizing conversation quality and start adding executable capabilities.

Your users don't need better answers. They need the work already done when they ask.

**Next step:** Watch how your users interact with your agent. When they get a response and then go do manual work (pull data, run code, create tickets), that's your skill backlog.

Build what they're doing manually. Make it a skill. Ship it.

That's how you go from "interesting demo" to "can't work without it."`;

async function updateContent() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    await db.collection('newsletters').updateOne(
      { slug: 'rag-skills-executable-capabilities' },
      { 
        $set: { 
          content: newContent,
          tags: ['AI Agents', 'AI Architecture', 'Enterprise AI', 'Developer Tools', 'Engineering', 'Automation']
        } 
      }
    );
    
    console.log('✅ Updated article content to focus on Agent Skills');
  } finally {
    await client.close();
  }
}

updateContent();
