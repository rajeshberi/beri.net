# Deployment Info

## Live URLs

**Production:** https://berinet.vercel.app  
**Preview:** https://beri-3vgcrus2w-rajesh-beris-projects.vercel.app

## Vercel Project

**Project:** rajesh-beris-projects/beri.net  
**Dashboard:** https://vercel.com/rajesh-beris-projects/beri.net

## Custom Domain Setup (beri.net)

### In Vercel Dashboard:
1. Go to: https://vercel.com/rajesh-beris-projects/beri.net/settings/domains
2. Add domain: `beri.net`
3. Vercel will show DNS records to add

### In Cloudflare:
Add these DNS records for beri.net:

**Option A: CNAME (Recommended)**
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy: Off (DNS only)
```

**Option B: A Records**
```
Type: A
Name: @
IPv4: 76.76.21.21
Proxy: Off (DNS only)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: Off (DNS only)
```

### SSL/TLS
Cloudflare SSL/TLS mode: **Full** (not Full Strict, since Vercel handles SSL)

## Deployed: 2026-03-07

Build time: ~44s  
Status: ✅ Successful
