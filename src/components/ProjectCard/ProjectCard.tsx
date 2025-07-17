"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Tag } from "../Tag";

type Props = {
  href: string;
  title: string;
  content: string;
  imageSrc: string;
  tags: string[];
};

export const ProjectCard = ({
  href,
  content,
  imageSrc,
  title,
  tags,
}: Props) => {
  return (
    <Link
      className="flex items-center md:flex-row flex-col border-2 border-slate-400 rounded-xs border-opacity-20 
          gap-8 group hover:cursor-pointer hover:bg-slate-400/10 p-4"
      href={href}
      target="_blank"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={200}
        className="rounded-xs group-hover:border-slate-400 border-2 border-transparent duration-200"
      />
      <div className="flex flex-col gap-4 h-full justify-center">
        <h2 className="text-lg font-bold group-hover:text-teal-600 flex gap-2 items-center">
          {title}
          <AiOutlineArrowUp className="rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
        </h2>
        <p className="text-slate-400 leading-2">{content}</p>
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {tags.map((tag) => (
            <Tag key={`${title + "-" + tag}-key`}>{tag}</Tag>
          ))}
        </motion.div>
      </div>
    </Link>
  );
};
