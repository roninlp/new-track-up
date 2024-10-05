import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full bg-[url('/digital-pattern.svg')] bg-[length:100px_100px] bg-repeat py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl/tight lg:text-6xl/tight">
            Track Your Progress with TrackUp
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            TrackUp is a powerful web application that helps you monitor and
            analyze your progress towards your goals. Get insights, stay
            motivated, and achieve more with TrackUp.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-end">
          <Image
            src="/hero-section-image.jpg"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
