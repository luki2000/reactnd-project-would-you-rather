export function checkIfUserAnsweredById(questionIds = [], questions, authUser) {
    const qId = Array.isArray(questionIds)
        ? questionIds
        : questionIds.split(' ');

    return qId.filter(id => questions[id].optionOne.votes.find(q => q === authUser) || questions[id].optionTwo.votes.find(q => q === authUser));
}