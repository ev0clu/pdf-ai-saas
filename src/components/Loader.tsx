export function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="text-surface inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-rose-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="img"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
