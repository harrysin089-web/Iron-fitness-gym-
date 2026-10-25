# Iron Fitness Gym

Scroll-driven 3D gym website. Next.js 15 (App Router) + TypeScript + React Three Fiber.

A fixed WebGL canvas sits behind the page. As you scroll, the camera travels between a barbell, kettlebell,
dumbbell and plate stack, while the page theme switches between chalk, iron and signal red.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # type-check
```

Requires Node 18.18 or newer.

## Deploy to Vercel

1. Push this folder to a GitHub repository (see below).
2. In Vercel choose **Add New > Project**, import the repository.
3. Framework preset is detected as **Next.js**. Leave build settings as they are and click **Deploy**.

## Push to GitHub

```bash
git init
git add .
git commit -m "Iron Fitness Gym"
git branch -M main
git remote add origin https://github.com/<your-user>/iron-fitness-gym.git
git push -u origin main
```

## Edit the content

| What | Where |
| --- | --- |
| Copy, prices, coaches, class timetable | `src/data/content.ts` |
| Colours, fonts, layout | `src/app/globals.css` |
| 3D objects and shapes | `src/components/three/Equipment.tsx` |
| Camera path, one waypoint per section | `src/components/three/Scene.tsx` |
| Page sections | `src/components/sections/` |

The join form shows a confirmation but does not send data yet. Connect it in `src/components/sections/Join.tsx`.
Replace the placeholder address (21 Foundry Lane) in the same file.
