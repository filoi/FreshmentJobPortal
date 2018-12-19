export default (Universities,text) => {
    return Universities.filter(university => {
        const  textMatch = university.name.toLowerCase().includes(text.toLowerCase());
        return textMatch; 
    })
}