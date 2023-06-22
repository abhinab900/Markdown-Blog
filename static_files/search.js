


async function getBlogs(){
    const res = await fetch('/api/blogs')
    const blogs = await res.json()
    document.getElementById('search-titles').addEventListener('keyup',(e)=>{
        let updated_blog = [];
        if(e.target.value ==''){
            updated_blog = blogs
        }else{
            updated_blog = blogs.filter((blog)=>{return blog.title.includes(e.target.value.toString())})
        }
        populate_blogs(updated_blog)
    })
}

function populate_blogs(blogs){
    const blogs_grid = document.getElementById('blogs-grid')

    let innerhtml = "";
    for(let article of blogs){
        innerhtml += `
        <div class="rounded-md mt-8 p-6 border border-white shadow h-80 flex flex-col justify-around">
            <div>
                <div class=" mb-2 flex justify-between">
                    <p class="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold line-clamp-2 py-2">${article.title}</p>
                    <form action="/articles/${article.id}?_method=DELETE" method="post">
                        <button>
                            <svg class="border border-white rounded-full bg-red-500 w-8 h-8 p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            <div class="mb-2 line-clamp-2">${article.desc}</div>
            <div class="flex md:flex-row flex-col items-center justify-between ">
                <div class="text-opacity-5 line-clamp-1 text-md mb-2 ml-4">Created at : ${new Date(article.createdAt).toLocaleString('en-IN', { timeZone: 'UTC' })}</div>
                <div class="flex">
                    <a href="/articles/show/${article.id}" class="flex items-center h-12 mx-1 px-6 rounded md bg-blue-500">Read More</a>
                    <a href="/articles/edit/${article.id}" class="flex items-center h-12 mx-1 px-6 rounded md bg-yellow-500">Edit</a>
                </div>
            </div>
        </div>
        `
    }

    blogs_grid.innerHTML = innerhtml
}

getBlogs()