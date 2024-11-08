import { ENDPOINT } from "../helpers/constants";

export const createQuestion = async ({ accessToken, form }) => {
    return await fetch(`${ENDPOINT}/api/question/create`, {
        method: "POST",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });
};

export const getQuestionsFromQuizId = async ({ accessToken, quizId }) => {
    return await fetch(`${ENDPOINT}/api/question/get/${quizId}`, {
        method: "GET",
        headers: {
            authorization: accessToken,
        },
    });
};

export const deleteQuestion = async ({ accessToken, id }) => {
    return await fetch(`${ENDPOINT}/api/question/delete`, {
        method: "DELETE",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });
};

export const updateQuestion = async ({ accessToken, form }) => {
    console.log("this is data -> ", accessToken, form);
    return await fetch(`${ENDPOINT}/api/question/update`, {
        method: "PUT",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });
};
