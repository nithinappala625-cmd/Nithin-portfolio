# Portfolio Website with Admin Panel

A modern, responsive portfolio website built for a Business Analyst / Data Analytics profile. Features a clean, corporate design and a custom admin panel for editing content directly in production.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Database (Content Store):** Vercel KV (Redis)
- **Emails:** Resend
- **Icons:** Lucide React

## Why Vercel KV?
Vercel KV is chosen as the content store because it provides a simple, serverless JSON document store with zero configuration needed when deploying on Vercel. Since Vercel's file system is read-only in production, local JSON files cannot be updated by an admin panel. Vercel KV solves this perfectly and is free for this scale.

## Deployment to Vercel

1. **Push to GitHub**
   Initialize a Git repository and push your code to GitHub.
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/) and click "Add New... Project".
   - Import your GitHub repository.

3. **Configure Environment Variables**
   Before clicking Deploy, add the following Environment Variables in the Vercel dashboard:
   - `ADMIN_PASSWORD`: A secure password you will use to log into the `/admin` dashboard.
   - `RESEND_API_KEY`: Your API key from [Resend](https://resend.com) (for the contact form).

4. **Add Vercel KV**
   - Click "Deploy". The initial build might fail or use default fallback data because KV isn't attached yet.
   - Once the project is created, go to the project's **Storage** tab in Vercel.
   - Click **Create Database** -> **KV**.
   - Follow the prompts to create it, and make sure it is linked to your project.
   - This automatically injects the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables into your project.
   - Trigger a redeploy of your Vercel project so the new variables take effect.

5. **Done!**
   - Your site is live! Navigate to `your-site.vercel.app/admin`.
   - Log in with the `ADMIN_PASSWORD` you set.
   - Edit the content and click "Save Changes". The public site will update immediately.

## Local Development

To run the project locally without Vercel KV, it will fallback to the default profile data specified in `src/lib/data.ts`.

```bash
npm install
npm run dev
```

If you want to test the admin saving locally, you can pull your Vercel KV environment variables using the Vercel CLI:
```bash
vercel env pull .env.local
```
