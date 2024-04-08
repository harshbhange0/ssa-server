export const data = [
  { baseurl: "https://ssa-server.onrender.com/api/v1/" },
  {
    admin: {
      preUrl: "admin/",
      signIn: { signIn: "sign-in", method: "post" },
      signUp: { signUp: "sign-up", method: "post" },
      verify: { verify: "/verify/:id", method: "get" },
    },
  },
];
