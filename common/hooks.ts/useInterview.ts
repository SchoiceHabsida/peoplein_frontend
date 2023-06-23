import { gql, useMutation } from "@apollo/client";

const createMutation = (type: string) => {
    return gql`
    mutation ($id: ID!) {
      ${type} (id: $id)
    }
  `
}

export const useInterview = (is_scheduled_for_interview: boolean, onSuccess: () => void, id: any) => {
    const [addInterview, { loading: interviewLoading }] =
    useMutation(createMutation(is_scheduled_for_interview ? 'deleteApplicantFromScheduledForInterview' :
        'addApplicantToInterviews'));

        const updateInterview = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (interviewLoading) {
                return;
            }
            e.stopPropagation();
            e.preventDefault()
            try {
                const response = await addInterview({
                    variables: { id }
    
                })
                if (response) {
                    onSuccess()
                }
            } catch (error) {
                console.log(error);
            }
        }

    return {
        updateInterview,
        interviewLoading
    }
}

export type IUseInterview = ReturnType<typeof useInterview>;
