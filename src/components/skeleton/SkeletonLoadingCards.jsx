const SkeletonLoadingCards = () => {
    const cardCount = window.innerWidth >= 1536 ? 30 : 20;

    const cards = Array.from({ length: cardCount }, (_, index) => (
        <div
            key={index}
            className="space-y-5 rounded-2xl bg-white w-[320px] md:w-[280px] animate-pulse"
        >
            <div className="h-64 rounded-xl bg-[#dddddd]"></div>
            <div className="space-y-3">
                <div className="h-3 w-3/5 rounded-lg bg-[#dddddd]"></div>
                <div className="h-3 w-4/5 rounded-lg bg-[#dddddd]"></div>
                <div className="h-3 w-2/5 rounded-lg bg-[#dddddd]"></div>
            </div>
        </div>
    ));

    return (
        <div className=" py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-5 max-w-screen-2xl">
            {cards}
        </div>
    );
};

export default SkeletonLoadingCards;
