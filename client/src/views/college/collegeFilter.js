export default (colleges,text) => {
    return colleges.filter(college => {
        const  textMatch = college.name.toLowerCase().includes(text.toLowerCase());
        return textMatch; 
    })
}