export const data = [
  {
    baseurl: "https://ssa-server.onrender.com/api/v1/",
  },
  {
    admin: {
      preUrl: "admin/",
      signIn: {
        endpoint: "sign-in",
        method: "post",
      },
      signUp: {
        endpoint: "sign-up",
        method: "post",
      },
      verify: {
        endpoint: "/verify/:id",
        method: "get",
      },
    },
  },
  {
    quiz: {
      preUrl: "quiz/",
      solved: [{}],
      attempted: [{}],
      unsolved: [
        {
          create_quiz: {
            endpoint: "create/quiz",
            method: "post",
          },
        },
        {
          create_question: {
            endpoint: "create/question",
            method: "post",
          },
        },
        {
          get_all_quiz: {
            endpoint: "all/quiz",
            method: "get",
          },
        },
        {
          get_all_admin_quiz: {
            endpoint: "all/admin/quiz/:adminId",
            method: "get",
          },
        },
        {
          update_quiz: {
            endpoint: "update/quiz/:quizId",
            method: "put",
          },
        },
        {
          update_question: {
            endpoint: "update/question/:questionId",
            method: "put",
          },
        },
      ],
    },
  },
];
