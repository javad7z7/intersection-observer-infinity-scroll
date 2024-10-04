"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <h1 className="text-purple-500 font-bold text-3xl">
        Intersection Observer Infinity Scroll
      </h1>
      <span>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Convallis blandit
        consequat nibh cursus tortor lacinia sapien. Euismod ornare rhoncus,
        malesuada pellentesque est pharetra erat gravida. Odio erat nisl dui
        accumsan pretium etiam in in. Nostra rhoncus sociosqu metus nisi ad
        adipiscing? Elit nullam maximus porttitor velit taciti. Dictum proin sed
        per lacinia ad. Litora augue fusce eros in congue. Faucibus mollis
        parturient sem orci hac. Viverra vehicula integer aliquam iaculis velit
        vehicula montes luctus fusce.
      </span>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {Array.from({ length: 30 }).map((_, index) => (
          <div className="bg-slate-100 flex justify-center items-center h-80 rounded">
            item {index}
          </div>
        ))}
      </div>
      <button className="bg-purple-500 px-4 py-2 self-center rounded-full">
        <span className="text-sm text-white font-semibold">Load More</span>
      </button>
    </main>
  );
}
