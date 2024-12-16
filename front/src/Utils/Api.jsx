const fetchCategories = async () => {
    try {
        const response = await fetch("https://back-eynq.vercel.app/api/infos");
    
        
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};