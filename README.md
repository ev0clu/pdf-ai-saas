# **PDF AI SaaS App**

A PDF AI SaaS full stack app has built with Next.js framework, Shadcn UI, OpenAI, LangChain, Stripe and more. The app allows users to upload any PDF document and search for specific information inside this document. Only authenticated users can use the platform. There are 2 options: Free plan with limited usage and Pro plan to give more features into the user.

### Demo: [Link]()

## Features

- Allow user to log in to the platform
- Allow user to upload any PDF document and search for any content inside this
- Intuitive Drag n&apos; Drop Uploads
- PDF Viewer to see the uploaded PDF document
- 100% written in TypeScript
- OpeanAI text embedding model has been used
- LangChain use to integrate LLM into the app
- Pinecone Vector Database has been used to store embeds data into vector space
- MongoDB NoSQL Database has been used to store user, document and chat informations
- Stripe payment is used with webhook for payment in order to retrive information about the status of the payment
- Next.js framework is used to create full stack app
- Tailwind CSS is used with Shadcn UI component library to built beautiful design
- Prisma ORM is used to communicate with database

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Generate auth secret, which automatically create .env.local file for environment variables (you can use _.env_ later and put the secret into it):
   `npx auth secret`
4. Set up Google OAuth: [Google](https://www.youtube.com/watch?v=ot9yuKg15iA&t=210s)
5. Add environment variables into the .env file:<br>
   `AUTH_SECRET="<YOUR-SECRET>"`<br>
   `AUTH_GOOGLE_ID="<YOUR-GOOGLE-ID>"`<br>
   `AUTH_GOOGLE_SECRET="<YOUR-GOOGLE-SECRET>"`<br>
   `DATABASE_URL="<YOUR-DATABASE-URL>"`<br>
   `UPLOADTHING_TOKEN="<YOUR-UPLOADTHING-TOKEN>"`<br>
   `PINECONE_API_KEY="<YOUR-PINECONE-TOKEN>"`<br>
   `OPENAI_API_KEY="<YOUR-OPENAI-TOKEN>"`<br>
   `STRIPE_PUBLIC_KEY="<YOUR-STRIPE-PUBLIC-TOKEN>"`<br>
   `STRIPE_SECRET_KEY="<YOUR-STRIPE-SECRET-TOKEN>"`<br>
   `STRIPE_SIGNATURE_SECRET="<YOUR-RANDOM-STRIPE-SIGNATURE-TOKEN>"`<br>
6. Run `npm run prisma:generate` in order to apply prisma schema
7. Run `npm run prisma:push` to push db to MongoDB
8. Run `npm run dev` command in your terminal
9. Server running at `http://localhost:3000/`

### Useful links and informations

- Prisma **env.local** handling:
  - [Stackoverflow](https://stackoverflow.com/questions/70491569/how-to-set-environment-variables-with-prisma-nextjs-and-vercel)
- Prisma and MongoDB edge compatibility:
  - [Auth.js](https://authjs.dev/guides/edge-compatibility)
- Auth.js code example:
  - [GitHub](https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs)
- Google Provider config page:
  - [Google](https://console.developers.google.com/apis/credentials)
  - [Youtube](https://www.youtube.com/watch?v=ot9yuKg15iA&t=210s)
- Stripe, checkout session, webhook:
  - [GitHub #1](https://github.com/stripe/stripe-node)
  - [GitHub #2](https://github.com/stripe-samples/accept-a-payment/blob/main/prebuilt-checkout-page/server/node/server.js)
  - [Linkedin.com](https://www.linkedin.com/pulse/how-create-stripe-webhook-nextjs-1344-mohsin-ali-soomro/)
  - [Dev.to](https://dev.to/mohsinalisoomro/how-to-create-stripe-webhook-in-nextjs-1344-5fn)
  - [Medium.com](https://medium.com/@lev"<YOUR-STRIPE-SIGNATURE-TOKEN>"i.schouten.werk/building-a-payment-flow-in-next-js-13-using-stripe-mailsender-and-webhooks-291996bf1b24)
- Stripe Test cards:
  - [Stripe.com](https://stripe.com/docs/checkout/quickstart#testing)

### Dependencies

- [React](https://react.dev/)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [Lucide Icons](https://lucide.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Sharp Image optimalization](https://www.npmjs.com/package/sharp)
- [Next.js](https://nextjs.org/)
- [Auth.js](https://authjs.dev/)

### Layout

![layout-1 picture](https://github.com/ev0clu/pdf-ai-saas/blob/main/layout-1.png?raw=true)<br>
