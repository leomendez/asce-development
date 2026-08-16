'use client';
import React from "react";
import Link from "next/link";
import { destinations } from "@/_data/navigation";

type Props = {
  /** Applied to each link, so callers can vary the hover treatment. */
  linkClassName?: string;
};

/** The interpunct-separated destination list shared by Chat and Decline. */
export const BrowseLinks = ({
  linkClassName = "text-teal-600 hover:text-teal-500 underline-animation transition-colors",
}: Props) => (
  <>
    {destinations.map((destination, index) => (
      <React.Fragment key={destination.href}>
        {index > 0 && " · "}
        <Link href={destination.href} className={linkClassName}>
          {destination.label}
        </Link>
      </React.Fragment>
    ))}
  </>
);
