const fetchCategories = async () => {
    try {
        const response = await fetch("https://back-eynq.vercel.app/api/infos");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};