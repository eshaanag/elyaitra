// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// const SUBJECTS = [
//   {
//     id: "ai",
//     title: "AI",
//     description: "Master machine learning, neural networks, and AI fundamentals.",
//     route: "/tutor/artificial-intelligence",
//     gradient: "from-orange-500 to-red-400",
//   },
//   {
//     id: "programming",
//     title: "Programming",
//     description: "Solve algorithms and data structures with expert guidance.",
//     route: "/tutor/python",
//     gradient: "from-purple-500 to-pink-400",
//   },
//   {
//     id: "chemistry",
//     title: "Chemistry",
//     description: "Master organic, inorganic, and physical chemistry concepts.",
//     route: "/tutor/chemistry",
//     gradient: "from-green-500 to-emerald-400",
//   },
//   {
//     id: "mechanical",
//     title: "Mechanical",
//     description: "Master mechanics, thermodynamics, and engineering principles.",
//     route: "/tutor/mechanical",
//     gradient: "from-blue-500 to-cyan-400",
//   },
// ];

// export default function SubjectsPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAccess = async () => {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         router.replace("/login");
//         return;
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/access/subjects?user_id=${userId}`
//       );

//       const data = await res.json();

//       if (!data.allowed) {
//         router.replace("/payment");
//       }
//     };

//     checkAccess();
//   }, [router]);

//   return (
//     <div className="relative min-h-screen bg-background overflow-hidden">
//       {/* Header */}
//       <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
//         <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
//           <Image src="/elyaltra-logo.png" alt="Elyaitra" width={140} height={48} priority />
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="relative z-10 max-w-6xl mx-auto px-4 py-20">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Choose Your <span className="text-gradient">Subject</span>
//         </h1>

//         <p className="text-lg text-muted-foreground max-w-2xl mb-14">
//           Select a subject to start your exam-focused learning journey.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {SUBJECTS.map((s, i) => (
//             <Link key={s.id} href={s.route} className="group relative rounded-3xl p-8 border">
//               <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
//               <p className="text-muted-foreground">{s.description}</p>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
