'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './ProjectFilter.module.css';
import { Category } from '@/types';

interface Props {
  categories: Category[];
}

export default function ProjectFilter({ categories }: Props) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  // Add "All" option at the beginning
  const allCategories = [{ id: 'all', slug: '', name: 'All' }, ...categories];

  return (
    <div className={styles.filterArea}>
      <div className={styles.container}>
        {allCategories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <Link
              key={cat.id}
              href={cat.slug ? `/projects?category=${cat.slug}` : '/projects'}
              className={`${styles.btn} ${isActive ? styles.btnActive : styles.btnInactive}`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
