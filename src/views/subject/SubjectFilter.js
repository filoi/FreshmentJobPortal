export default (SubCategory,text) => {
    return SubCategory.filter(subcate => {
        const  textMatch = subcate.name.toLowerCase().includes(text.toLowerCase());
        return textMatch; 
    })
}