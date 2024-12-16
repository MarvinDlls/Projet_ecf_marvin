const fetchCategories = async () => {
    const response = await fetch("https://back-eynq.vercel.app/api/infos");
    const data = await response.json();

    return data;
}

export {
    fetchCategories,
}