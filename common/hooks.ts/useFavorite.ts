import { gql, useMutation } from "@apollo/client";

const createMutation = (type: string) => {
    return gql`
    mutation ($id: ID!) {
      ${type} (id: $id)
    }
  `
}

export const useFavorite = (is_favorite: boolean, onSuccess: () => void, id: any) => {
    const [addFavorite, { loading: mutationLoading }] =
        useMutation(createMutation(is_favorite ? 'deleteApplicantFromFavourites' : 'addApplicantToFavourites'));

    const updateFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (mutationLoading) {
            return;
        }
        e.stopPropagation();
        e.preventDefault()
        try {
            const response = await addFavorite({
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
        updateFavorite,
        addFavorite,
        mutationLoading
    }
}

export type IUseFavorite = ReturnType<typeof useFavorite>;
