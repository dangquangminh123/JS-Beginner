const TODOLIST_APP_UNITOP = "TODOLIST_APP_UNITOP";
// tên công việc - trạng thái công việc
let data = [
  {
    task: "ReactJs Ultimate Project Test Wizz",
    is_complete: true,
  },
  {
    task: "ReactJs + ANTD Project Ecommerce Book",
    is_complete: true,
  },
  {
    task: "ReactJs Typescripts Projects Resume",
    is_complete: true,
  },
  {
    task: "Hoàn thành PHP MASTER course",
    is_complete: false,
  },
  {
    task: "Hoàn thành NextJs Pro + ANTD",
    is_complete: false,
  },
  {
    task: "Clone trang home https://demo2.themelexus.com/bexper/",
    is_complete: false,
  },
  {
    task: "Clone trang home https://asiantripvn.com/",
    is_complete: false,
  },
  {
    task: "Truy tìm 10 mẫu animation for Card Ui HTML CSS JS",
    is_complete: false,
  },
  {
    task: "Tìm hiểu 5 tính năng cho components website with JS, JQUERY",
    is_complete: false,
  },
  {
    task: "Hoàn Thành Khóa Laravel Pro",
    is_complete: false,
  },
  {
    task: "Clone các trang trong của https://demo2.themelexus.com/bexper/",
    is_complete: false,
  },
];

// input data-> Save LocalStorage

const saveData = (data) => {
  localStorage.setItem(TODOLIST_APP_UNITOP, JSON.stringify(data));
};
saveData(data);

// Output: array
const loadData = () => {
  let data;
  data = JSON.parse(localStorage.getItem(TODOLIST_APP_UNITOP));
  data = data ? data : [];
  return data;
};

data = loadData();

// Add Task
const addTask = (new_task) => {
  let data;
  data = loadData();
  data = [...data, new_task];
  saveData(data);
};

const createTaskItem = (task, is_complete, index) => {
  return `
  <li class="task-item" index=${index} is-complete=${is_complete}>
        <span class='task' onclick="markTaskComplete(${index})">${task}</span>
        <div class="task-action">
          <button onclick="deleteTask(this, ${index})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <button onclick="pushEditTask(${index})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      </li>
  `
}
const renderTasks = () => {
  let data, ulTasksHtml, ulTasks, task_result, count_complete;
  ulTasks = document.querySelector('ul.tasks');
  task_result = document.querySelector('.task-result');
  data = loadData();
  // console.log(data);
  count_complete = 0;
  ulTasksHtml = data.map((element, index) => {
    if(element.is_complete == true) count_complete++;
    return createTaskItem(element.task, element.is_complete, index);
  });
  task_result.textContent = `Yeah, ${count_complete} task completed!`;
    //join là dùng để nối các thành phần html với nhau và loại bỏ dấu ` giữa các phần tử
  ulTasks.innerHTML = ulTasksHtml.join('');
}


const markTaskComplete = (index) => {
    let data;
    data = loadData();
    data[index].is_complete = data[index].is_complete == true? false: true;
    saveData(data);
    renderTasks();
}

const deleteTask = (element, index) => {
    let data;
    let delete_confirm = confirm('Bạn có muốn thực sự xóa công việc này không ?');
    if(delete_confirm == false) return false;
    data = loadData();
    data.splice(index, 1);
    saveData(data);
    element.closest('.task-item').remove();
    // renderTasks();
}

const pushEditTask = (index) => {
    let data = loadData();
    const btn = document.querySelector('#add_task button');
    const task = document.querySelector("#task");
    task.value = data[index].task;
    task.setAttribute('index', index);
    btn.innerText = 'EDIT TASK';
    
}

const editTask = (task, index) => {
    const btn = document.querySelector('#add_task button');
    let data = loadData();
    data[index].task = task;
    btn.innerText = 'ADD TASK';
    saveData(data);
}

const formAddTask = document.forms.add_task;

formAddTask.addEventListener("submit", (e) => {
    let new_task;
    const task = document.querySelector("#task");
    const index = task.getAttribute('index');

    if(task.value.length < 2) {
      alert('Enter Your Task!');
      return false;
    }

    if(index) {
        editTask(task.value, index);
        task.removeAttribute('index');
    }else {
        new_task = {
            task: task.value,
            is_complete: false,
          };
          addTask(new_task);
    }
    renderTasks();
    task.value= '';
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
  const task = document.querySelector('#task');
  // phím esc có mã là 27
  // console.log(e.which);
  if(e.which == 27) {
    task.value = "";
    task.removeAttribute('index');
    const btn = document.querySelector('#add_task button');
    btn.innerText = 'ADD TASK';
  }
});
renderTasks();
