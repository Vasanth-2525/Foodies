import Error from '../assets/food/error.avif'

const ErroePage = () => {
  return (
    <div
      className="h-[50vh] text-red-500 flex items-center justify-center text-3xl"
      style={{
        backgroundImage: `url(${Error})`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "30%",
      }}
    ></div>
  );
};

export default ErroePage;
