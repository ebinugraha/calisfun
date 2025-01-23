// import { redirect } from "next/navigation";
// import { checkRole } from "@/utils/roles";
// import { SearchUsers } from "./SearchUsers";
// import { clerkClient } from "@clerk/nextjs/server";
// import { removeRole, setRole } from "./_actions";

// export default async function AdminDashboard(params: {
//   searchParams: Promise<{ search?: string }>;
// }) {
//   if (!checkRole("admin")) {
//     redirect("/");
//   }

//   const query = (await params.searchParams).search;

//   const client = await clerkClient();

//   //   const response = (await clerkClient()).users.getUserList({query}).data : []

//   const users = (await client.users.getUserList()).data;

//   return (
//     <>
//       <p>
//         This is the protected admin dashboard restricted to users with the
//         `admin` role.
//       </p>

//       <SearchUsers />

//       {users.map((user) => {
//         return (
//           <div key={user.id}>
//             <div>
//               {user.firstName} {user.lastName}
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }
