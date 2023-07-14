import img1 from '../Images/img1.jpg'
import img2 from '../Images/img2.jpg'
import img3 from '../Images/img3.jpg'
import img4 from '../Images/img4.jpg'
import img5 from '../Images/img5.jpg'


const data = [
    {id:1, avataUser:img1, type:'image', media:img1},
    {id:2, avataUser:img1, type:'image', media:img2},
    {id:3, avataUser:img1, type:'image', media:img3},
    {id:4, avataUser:img1, type:'image', media:img4},
    {id:5, avataUser:img1, type:'video', media:img5}
]

const initialState = {
    stories: data
};

export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}