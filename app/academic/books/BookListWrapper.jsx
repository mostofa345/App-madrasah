"use client";
import { useState } from "react";
import BookFilter from "@/components/books/BookFilter";
import BookGrid from "@/components/books/BookGrid";

export default function BookListWrapper() {
  const [activeCategory, setActiveCategory] = useState("All Books");

  return (
    <>
      <BookFilter active={activeCategory} setActive={setActiveCategory} />
      <BookGrid activeCategory={activeCategory} />
    </>
  );
}