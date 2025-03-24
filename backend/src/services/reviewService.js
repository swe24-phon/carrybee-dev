//Vlad to do
const prisma = require('../../prismaClient');

const createReview = async (reviewData) =>
{
    try{
        // There's a field for order labelled 'Order?'
        // Wonder if we're going to use that
        const {rating, comment, user_id, driver_id} = reviewData;
        
        // Can add validation checks for offensive
        // or vulgar language

        //Create the payment record
        const newReview = await prisma.review.create(
            {
                data: 
                {
                    rating,
                    comment,
                    user_id,
                    driver_id
                }
            }
        );
        return {message: 'Review Record created successfully', review: newReview};
    }
    catch (error)
    {
        throw new Error('Failed to create review: ' + error.message);
    }
}

// In a real situation there could be tens of thousands of payments
// so it'd be ill-advised to get ALL payments
const getAllReviews = async () => 
{
    try
    {
        return await prisma.review.findMany();
    }
    catch (error)
    {
        throw new Error('Failed to get all reviews: ' + error.message);
    }
}

const getReviewById = async (id) => 
{
    try
    {
        const review = await prisma.review.findUnique({where: {id}});
        if(!review)
        {
            throw new error('Review not found');
        }
        return review;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
}

// Need to update this to return a list
// of reviews rather than a single one
const getReviewByUser = async (userId) => 
    {
        try
        {
            const review = await prisma.review.findUnique({where: {userId}});
            if(!review)
            {
                throw new error('Review not found');
            }
            return review;
        }
        catch(error)
        {
            throw new Error(error.message);
        }
    }
    

const updateReview = async (id, updateData) =>
{
    try
    {
        const {rating, comment, user_id, driver_id} = updateData;
        const updatedrReview = await prisma.review.update(
            {
                where: {id},
                data: {
                    rating: rating || undefined,
                    comment: comment || undefined,
                    user_id: user_id || undefined,
                    driver_id: driver_id || undefined
                }
            }
        );
        return {message: 'Review updated successfully', review: updatedrReview};
    }
    catch(error)
    {
        throw new Error(error.message);
    }
}

const deleteReview = async (id) =>
{
    try
    {
        await prisma.review.delete( {where: {id}});
        return {message: 'Review deleted successfully'};
    }
    catch(error)
    {
        console.log(error)
        throw new Error ('Failed to delete review');
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewByUser,
    updateReview,
    deleteReview
}