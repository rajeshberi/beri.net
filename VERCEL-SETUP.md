# Vercel Environment Variables Setup

## Required Environment Variables

To enable newsletter signups on the website, add these environment variables to your Vercel project:

### MongoDB Connection

1. Go to: https://vercel.com/rajesh-beris-projects/beri-net/settings/environment-variables

2. Add the following variables:

**MONGODB_URI**
```
mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

**MONGODB_DB**
```
beri-newsletter
```

3. Set environment scope:
   - ✓ Production
   - ✓ Preview
   - ✓ Development

4. Click "Save"

5. **Redeploy** the site for changes to take effect:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## How It Works

When someone subscribes on the website:

1. Form submission → `/api/subscribe` endpoint
2. API validates email
3. Checks MongoDB for existing subscriber
4. If new: Creates subscriber document in `subscribers` collection
5. If existing active: Returns "already subscribed" message
6. If existing inactive: Reactivates subscription
7. Returns success/error message to user

---

## Testing

After deploying with environment variables:

1. Visit https://www.beri.net
2. Scroll to newsletter signup form
3. Enter test email
4. Click "Subscribe"
5. Should see "Success! Check your inbox"

Verify in MongoDB:
```bash
./subscribers list
```

Should show the new subscriber.

---

## Security

- Environment variables are encrypted in Vercel
- Never commit `.env.local` to git (already in .gitignore)
- MongoDB credentials use strong authentication
- API endpoint validates all inputs

---

## Troubleshooting

**"Network error" message:**
- Check if environment variables are set in Vercel
- Verify MongoDB Atlas allows Vercel IP ranges (or use 0.0.0.0/0)

**"Something went wrong" message:**
- Check Vercel function logs
- Verify MongoDB connection string is correct
- Ensure MONGODB_DB name matches

**No response from form:**
- Check browser console for errors
- Verify API route is deployed (`/api/subscribe`)
