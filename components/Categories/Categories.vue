<template>
    <div class="mt-6">
        <!-- Encabezado -->
        <div class="">
            <h1
                class="text-slate-900 dark:text-white font-bold text-3xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
                Nuestras Categorías</h1>
            <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-4">
                Explora nuestros productos por categoría
            </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex flex-col items-center justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Cargando categorías...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!data || data.length === 0"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div
                class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i class="ri-folder-line text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No hay categorías disponibles</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Pronto tendremos nuevas categorías para ti</p>
        </div>

        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <NuxtLink v-for="category in data" :key="category.id" :to="`/category/${category.slug || category.id}`"
                class="category-card bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">

                <div class="p-5 flex flex-col items-center text-center h-full">
                    <!-- Icono/Imagen de categoría -->
                    <div
                        class="w-16 h-16 mb-4 rounded-full bg-pink-50 dark:bg-slate-700 flex items-center justify-center text-3xl text-pink-600 dark:text-pink-400 group-hover:bg-pink-100 dark:group-hover:bg-slate-600 transition-colors">
                        <i class="ri-folder-line"></i>
                    </div>

                    <!-- Nombre de categoría -->
                    <h3
                        class="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {{ category.name }}
                    </h3>

                    <!-- Contador de productos -->
                    <span class="text-sm text-gray-600 dark:text-gray-300 mt-auto">
                        {{ category.productCount || 0 }} productos
                    </span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data, pending } = await useAsyncData(
    'categories',
    async () => {
        try {
            const { data: apiData } = await useFetch('/api/v1/category');

            return (apiData.value || [])
                .map((cat: any) => ({
                    ...cat,
                    productCount: cat._count?.products || 0
                }))
                .filter((cat: any) => cat.productCount > 0);
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    },
    {
        // Opciones adicionales (opcional)
        server: true,  // Se ejecuta en el servidor
        lazy: false,   // No carga perezosamente (mejor para SEO)
        transform: (data) => data // Transformación adicional si es necesaria
    }
);
</script>

<style scoped>
.category-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.dark .category-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Animación de carga */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>