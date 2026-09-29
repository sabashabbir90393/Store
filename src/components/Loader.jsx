function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#E5E2D8]" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#0F3D35]" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[#6B746F]">
          {text}
        </p>

        <p className="mt-1 text-xs text-[#A0A6A2]">
          SHOPHIVE
        </p>
      </div>
    </div>
  );
}

export default Loader;