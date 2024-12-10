const fetchCategories = async () => {
    const response = await fetch("http://localhost:3001/api/infos");
    const data = await response.json();

    return data;
}

export {
    fetchCategories,
}