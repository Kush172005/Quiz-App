import { ENDPOINT } from "../helpers/constants";

export const createQuiz = async ({
    accessToken,
    title,
    description,
    accessType,
    accessTo = [],
}) => {
    const payload = {
        title,
        description,
        accessType,
        accessTo,
    };

    return await fetch(`${ENDPOINT}/api/quiz/create`, {
        method: "POST",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};

export const getAllQuiz = async ({ accessToken }) => {
    return await fetch(`${ENDPOINT}/api/quiz/get`, {
        method: "GET",
        headers: {
            authorization: accessToken,
        },
    });
};

export const getQuizById = async ({ id, accessToken }) => {
    return await fetch(`${ENDPOINT}/api/quiz/get/${id}`, {
        method: "GET",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
    });
};

export const deleteQuiz = async ({ accessToken, quizId }) => {
    return await fetch(`${ENDPOINT}/api/quiz/delete`, {
        method: "DELETE",
        headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: quizId }),
    });
};
