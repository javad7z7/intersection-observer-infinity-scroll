"use client";

import { useRef, useCallback, useEffect } from "react";
import { useMovies, TMovieApi } from "@/app/services/get-movies";
import Image from "next/image";

export default function Home() {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useMovies(
    {}
  );
  const rewriteData = data?.pages.flatMap((item) => item.data) ?? [];

  const lastMovie = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      if (isFetchingNextPage) return;
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { rootMargin: "400px" }
      );
      observer.current.observe(node);
    },
    [isFetchingNextPage]
  );

  console.log(hasNextPage);

  return (
    <main className="flex min-h-screen flex-col gap-4 py-6 px-10">
      <h1 className="text-primary font-bold text-3xl mt-10">
        Intersection Observer Infinity Scroll
      </h1>
      <span className="text-white font-medium text-pretty mb-10">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
        zzril delenit augue duis dolore te feugait nulla facilisi.
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-10">
        {rewriteData.map((item, index) => (
          <div
            key={index}
            ref={index === rewriteData.length - 1 ? lastMovie : null}
            className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-zinc-900"
          >
            <div className="relative h-[308px] w-full rounded-b-2xl overflow-hidden">
              <Image src={item.poster} fill alt={item.title} />
              <span className="text-sm text-black font-bold absolute right-3 top-3 bg-primary rounded-full px-2">
                Rate: {item.imdb_rating}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-1 p-4">
              <h3 className="font-bold text-base text-white">{item.title}</h3>
              <span className="text-sm font-normal text-slate-300">
                Country: {item.country}
              </span>
              <span className="text-sm font-normal text-slate-300">
                Year: {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <button className="bg-primary px-4 py-2 self-center rounded-full">
          <span className="text-sm text-black font-semibold">Loading...</span>
        </button>
      )}
    </main>
  );
}
