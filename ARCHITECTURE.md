# ARCHITECTURE

## Stack Choice

I chose Next.js with TypeScript because it provides:
- Fast deployment on Vercel
- Built-in routing
- Good React ecosystem compatibility
- Strong TypeScript support
- Easy server/client rendering

Supabase was chosen because it simplified backend storage and reduced operational overhead for a small MVP.

---

## System Diagram

```mermaid
graph TD

A[User Input Form] --> B[Audit Engine]
B --> C[Pricing Rules]
B --> D[Savings Calculation]
D --> E[Results Page]
E --> F[AI Summary Generator]
E --> G[Lead Capture]
G --> H[Supabase Database]
E --> I[Shareable Public URL]