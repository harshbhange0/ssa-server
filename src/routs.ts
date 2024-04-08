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
  {
    quiz: {
      preUrl: "quiz/",
      solved: {},
      unsolved: [
        {
          create_quiz: "create/quiz",
          method: "post",
        },
        {
          create_question: "create/question",
          method: "post",
        },
        {
          get_all_quiz: "all/quiz",
          method: "get",
        },
        {
          get_all_admin_quiz: "all/admin/quiz/:adminId",
          method: "get",
        },
        {
          update_quiz: "update/quiz/:quizId",
          method: "put",
        },

        {
          update_question: "update/question/:questionId",
          method: "put",
        },
      ],
    },
  },
];
