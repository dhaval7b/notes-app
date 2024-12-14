import axios from 'axios'
const API = axios.create({baseURL: "http://localhost:5000"});

export const getAllNotes = async () => {
    try{
        const response = await API.get("/notes");
        // console.log(response.data)
        return response.data;
    } catch(error){
        console.error("failed to fetch notes ", error)
        throw error;
    }
};
export const createNote = async (note) =>{
    try{
        const response = await API.post("/notes", note);
     return response.data;
    } catch(error){
        console.log("error adding a new note", error)
    }
};

export const getNoteById = async (id) => {
    const response = await API.get(`/notes/${id}`);
    return response.data;
};
export const updateNote = async (id, note) => {
    const response = await API.put(`/notes/${id}`, note);
    return response.data
};
export const deleteNote = async (id) => {
    const response = await API.delete(`/notes/${id}`)
    return response.data;
};
