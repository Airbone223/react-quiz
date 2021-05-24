import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-8929a-default-rtdb.europe-west1.firebasedatabase.app/'
})