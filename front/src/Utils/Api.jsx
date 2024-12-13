const fetchCategories = async () => {
    const response = await fetch("https://back-1-2yao.onrender.com/api/infos");
    const data = await response.json();

    return data;
}

export {
    fetchCategories,
}