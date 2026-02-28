# 📋 Hướng Dẫn Các Component Trello Mới

Dự án đã được cập nhật với các tính năng mới giống như Trello. Dưới đây là hướng dẫn chi tiết:

## ✨ Các Component Mới

### 1. **ProjectStats.vue** - Thống Kê Tiến Độ
📊 Hiển thị số liệu thống kê dự án

**Tính năng:**
- Tổng số nhiệm vụ
- Nhiệm vụ hoàn thành (%)
- Nhiệm vụ đang làm (%)
- Nhiệm vụ trễ hạn
- Thanh tiến độ tổng thể
- Breakdown theo trạng thái (Todo/In Progress/Done)

**Props:**
```javascript
{
  tasks: Array  // Danh sách các task
}
```

**Cách sử dụng:**
```vue
<ProjectStats :tasks="project.tasks || []" />
```

---

### 2. **ProjectMembers.vue** - Quản Lý Thành Viên
👥 Quản lý danh sách thành viên dự án

**Tính năng:**
- Hiển thị danh sách thành viên với avatar, email
- Hiển thị vai trò (Admin/Developer/Designer/Viewer)
- Nút thêm thành viên mới
- Nút chỉnh sửa thành viên (hover)
- Nút xóa thành viên (hover)
- Phân loại màu sắc theo vai trò

**Props:**
```javascript
{
  members: Array  // Danh sách thành viên
}
```

**Events:**
```javascript
update-members(updatedMembers)  // Phát ra khi thành viên được thêm/sửa/xóa
```

**Cách sử dụng:**
```vue
<ProjectMembers
  :members="project.members"
  @update-members="updateMembers"
/>
```

---

### 3. **MemberManageModal.vue** - Modal Quản Lý Thành Viên
🎯 Modal để thêm hoặc chỉnh sửa thành viên

**Tính năng:**
- Form nhập tên, email
- Chọn vai trò (Admin/Developer/Designer/Viewer)
- Mô tả vai trò
- URL avatar (optional)
- Preview avatar
- Validate email

**Props:**
```javascript
{
  member: Object || null,  // Thành viên cần chỉnh sửa (null = thêm mới)
  members: Array          // Danh sách thành viên hiện có
}
```

**Events:**
```javascript
close()                    // Đóng modal
save(memberData)          // Lưu thành viên
```

---

### 4. **EditTaskModal.vue** - Modal Chỉnh Sửa Task
✏️ Modal mở rộng để chỉnh sửa chi tiết task

**Tính năng:**
- Chỉnh sửa tên task (inline editable)
- Chỉnh sửa mô tả
- Chọn ưu tiên (Low/Medium/High)
- Gán người thực hiện
- Đặt/chỉnh sửa deadline
- Chọn trạng thái (Todo/In Progress/Done)
- Quản lý subtask (xem bên dưới)
- Bình luận trong task (xem bên dưới)
- Nút xóa task

**Props:**
```javascript
{
  task: Object,      // Task cần chỉnh sửa
  members: Array     // Danh sách thành viên
}
```

**Events:**
```javascript
close()             // Đóng modal
save(updatedTask)   // Lưu task
delete(taskId)      // Xóa task
```

**Cách sử dụng:**
```vue
<EditTaskModal
  :task="selectedTask"
  :members="project.members"
  @close="selectedTask = null"
  @save="updateTask"
  @delete="deleteTask"
/>
```

---

### 5. **SubtaskList.vue** - Quản Lý Subtask
✓ Quản lý danh sách công việc con

**Tính năng:**
- Thêm subtask mới
- Xóa subtask
- Check/uncheck subtask (đánh dấu hoàn thành)
- Hiển thị số subtask hoàn thành

**Props:**
```javascript
{
  subtasks: Array  // Danh sách subtask
}
```

**Events:**
```javascript
add-subtask(subtask)       // Thêm subtask mới
remove-subtask(subtaskId)  // Xóa subtask
toggle-subtask(subtaskId)  // Toggle hoàn thành
```

**Cách sử dụng:**
```vue
<SubtaskList
  :subtasks="task.subtasks || []"
  @add-subtask="addSubtask"
  @remove-subtask="removeSubtask"
  @toggle-subtask="toggleSubtask"
/>
```

---

### 6. **CommentsSection.vue** - Bình Luận Task
💬 Phần bình luận trong chi tiết task

**Tính năng:**
- Thêm bình luận mới
- Hiển thị tác giả, thời gian (cách đây X phút)
- Avatar của người bình luận
- Xóa bình luận (hover)
- Scroll nếu có nhiều bình luận

**Props:**
```javascript
{
  comments: Array  // Danh sách bình luận
}
```

**Events:**
```javascript
add-comment(comment)       // Thêm bình luận
delete-comment(commentId)  // Xóa bình luận
```

**Cách sử dụng:**
```vue
<CommentsSection
  :comments="task.comments || []"
  @add-comment="addComment"
  @delete-comment="deleteComment"
/>
```

---

### 7. **KanbanBoardDraggable.vue** - Kanban với Kéo Thả
🎯 Phiên bản Kanban Board hỗ trợ drag-and-drop

**Tính năng:**
- Kéo thả task giữa các cột
- Tự động cập nhật trạng thái task
- Mở EditTaskModal bằng cách click vào task
- Thêm/xóa task
- Thêm cột mới

**Props:**
```javascript
{
  project: Object  // Dữ liệu dự án
}
```

**Events:**
```javascript
update-project(updatedProject)  // Phát ra khi project thay đổi
```

**Cách sử dụng:**
```vue
<KanbanBoardDraggable
  :project="project"
  @update-project="project = $event"
/>
```

---

## 🔄 Luồng Sử Dụng trong StageProject.vue

### 1. Xem Thống Kê
- Click button "📊 Thống kê" để bật/tắt hiển thị ProjectStats
- Xem % hoàn thành, số task, task trễ hạn

### 2. Quản Lý Thành Viên
- Click button "👥 Thành viên"
- Xem danh sách hiện tại
- Click "+ Thêm" để thêm thành viên mới
- Hover vào thành viên → Click "✎" để chỉnh sửa
- Hover vào thành viên → Click "✕" để xóa

### 3. Chỉnh Sửa Task
- Click vào task card → Mở EditTaskModal
- Chỉnh sửa các thông tin (tiêu đề, mô tả, deadline, v.v.)
- Thêm subtask
- Thêm bình luận
- Click "Lưu" để cập nhật hoặc "🗑️ Xóa" để xóa task

### 4. Kéo Thả (Drag-and-Drop)
- Drag task từ cột này sang cột khác
- Trạng thái task tự động cập nhật

---

## 📦 Data Model

### Task Object
```javascript
{
  id: 1,
  title: "Design Homepage",
  description: "Create responsive homepage",
  priority: "High",              // High/Medium/Low
  assignee: "Mike Johnson",
  dueDate: "2024-03-15",
  status: "Todo",               // Todo/In Progress/Done
  createdAt: "2024-03-01",
  subtasks: [
    { id: 1, title: "Create mockup", completed: false },
    { id: 2, title: "Get approval", completed: true }
  ],
  comments: [
    {
      id: 1,
      text: "Need to add dark mode",
      author: "John Doe",
      avatar: "https://...",
      createdAt: "2024-03-05T10:30:00"
    }
  ]
}
```

### Member Object
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",                // Admin/Developer/Designer/Viewer
  avatar: "https://..."
}
```

### Project Object
```javascript
{
  id: 1,
  name: "E-commerce Platform",
  description: "Build a modern e-commerce",
  createdAt: "2024-03-01",
  members: [...],
  tasks: [...],
  columns: [
    { id: "todo", label: "Chưa làm", status: "Todo" },
    { id: "in-progress", label: "Đang làm", status: "In Progress" },
    { id: "done", label: "Hoàn thành", status: "Done" }
  ]
}
```

---

## 🎨 CSS Classes Sử Dụng

- `bg-[#020617]` - Nền tối chính
- `bg-[#1d2125]` - Nền phụ
- `text-white` - Text chính
- `text-[#9fadbc]` - Text phụ (muted)
- `border-[#3f474f]` - Border
- `bg-[#0c66e4]` - Blue primary (action)

---

## 🚀 Tính Năng Sắp Tới

Có thể thêm sau:
- [ ] Table view (hiển thị task dạng bảng)
- [ ] Calendar view (hiển thị task theo lịch)
- [ ] Filter & Search nâng cao
- [ ] Custom labels/tags
- [ ] Activity log
- [ ] Notifications
- [ ] Attachments

---

## 💡 Lưu Ý

1. **Drag-and-drop** sử dụng HTML5 native API, không cần library thêm
2. Tất cả component có **animation mượt mà** bằng Tailwind CSS
3. **Responsive design** - hoạt động tốt trên mobile, tablet, desktop
4. Những component không thay đổi (KanbanBoard.vue, TaskCard.vue, TaskModal.vue) vẫn được giữ nguyên
5. MockApi.js có dữ liệu mẫu - cần update lại khi dùng API thực

Chúc bạn làm việc vui vẻ! 🎉
