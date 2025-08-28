export const getRelaxContent = async () => {
    const res = await fetch('http://localhost:3001/relax_content');
    if (!res.ok) throw new Error('Lỗi khi fetch dữ liệu');
    const json = await res.json();
    return json;
};
