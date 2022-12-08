<template>
  <Header />
  <PostHeading />
  <main flex="~ row nowrap" justify-center mx-auto md:px-8 overflow-hidden>
    <div hidden md:block px-8 overflow-y-auto basis-20rem>
      {{ "" }}
    </div>
    <slot />
    <div hidden lg:block px-8 overflow-y-auto basis-20rem relative>
      <DocAsideOutline />
    </div>
  </main>
  <Footer />
</template>
