<h1 align="center" >Admin Dashboard for E-Commerce Store</h1>
<p align="center">
  <img src="https://github.com/Captain-Leftovers/assets/blob/master/e-store-dash.png" alt="e-store-dash image" />
</p>
<p>The Admin Dashboard is a crucial component of the E-Commerce application, facilitating the management of stores, products, categories, and more.</p>

<h2>Dashboard Features</h2>

<ul>
    <li><strong>Shadcn UI Integration:</strong> The dashboard employs Shadcn UI for a modern and intuitive admin experience.</li>
    <li><strong>Store and Vendor Management:</strong> Control multiple vendors or stores from a single CMS, with API routes generated for each.</li>
    <li><strong>Category and Product Management:</strong> Create, update, and delete categories and products. Manage "Billboards" for marketing purposes, attachable to categories or as standalone entities.</li>
    <li><strong>Featured Products and Analytics:</strong> Highlight "featured" products, view orders, sales, and access revenue graphs for comprehensive insights.</li>
    <li><strong>Authentication and Security:</strong> Leverages Clerk for authentication, ensuring secure access to the dashboard.</li>
</ul>

<h2>Prerequisites</h2>

<p>Node version 14.x is required.</p>

<h2>Getting Started</h2>

<h3>Cloning the Repository</h3>

<pre><code>git clone https://github.com/Captain-Leftovers/ecommerce-admin-dashboard.git </code></pre>

<h3>Installing Dependencies</h3>

<pre><code>npm i</code></pre>

<h3>Setting Up Environment Variables</h3>

<p>Create a <code>.env</code> file at the root of your project and include the following configurations:</p>

<pre><code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=</code></pre>

<h3>Connecting to PlanetScale and Pushing Prisma Schema</h3>

<pre><code>npx prisma generate
npx prisma db push</code></pre>

<h3>Launching the Dashboard</h3>

<pre><code>npm run dev</code></pre>

<h2>Available Commands</h2>

<ul>
    <li><code>npm run dev</code>: Starts a development instance of the app.</li>
</ul>
