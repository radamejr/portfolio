function CardComponent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </section>
  );
}

export default CardComponent;
