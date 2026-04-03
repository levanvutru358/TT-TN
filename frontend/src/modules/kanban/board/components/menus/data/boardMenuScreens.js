export const BOARD_MENU_SCREENS = {
  share: {
    title: "Chia sẻ",
    subtitle: "Mời thành viên, sao chép liên kết và thiết lập quyền truy cập cho bảng.",
    sections: [
      {
        title: "Mời thành viên",
        items: [
          {
            type: "input",
            label: "Email hoặc tên người dùng",
            placeholder: "name@example.com",
          },
          {
            type: "choice",
            label: "Quyền truy cập",
            options: ["Thành viên", "Người xem"],
          },
        ],
      },
      {
        title: "Chia sẻ nhanh",
        items: [
          {
            type: "option",
            label: "Sao chép liên kết bảng",
            sub: "Tạo liên kết nhanh để chia sẻ với đồng đội.",
          },
          {
            type: "toggle",
            label: "Cho phép gửi yêu cầu tham gia",
            sub: "Người có liên kết có thể gửi yêu cầu tham gia board.",
            defaultValue: true,
          },
        ],
      },
    ],
  },

  about: {
    title: "Về bảng này",
    subtitle: "Cập nhật mô tả và thông tin nhận diện của bảng.",
    sections: [
      {
        title: "Thông tin chính",
        items: [
          {
            type: "textarea",
            label: "Mô tả bảng",
            placeholder: "Mô tả mục tiêu, quy trình hoặc cách dùng bảng...",
          },
          {
            type: "input",
            label: "Người phụ trách",
            placeholder: "Tên quản trị viên",
          },
        ],
      },
      {
        title: "Hiển thị",
        items: [
          {
            type: "toggle",
            label: "Hiển thị mô tả ở đầu bảng",
            sub: "Cho phép mô tả xuất hiện ngay phần header của board.",
          },
        ],
      },
    ],
  },

  visibility: {
    title: "Khả năng hiển thị",
    subtitle: "Chọn ai có thể xem hoặc chỉnh sửa bảng.",
    sections: [
      {
        title: "Mức hiển thị",
        items: [
          {
            type: "choice",
            label: "Chế độ hiển thị",
            options: ["Riêng tư", "Không gian làm việc", "Công khai"],
          },
        ],
      },
      {
        title: "Quyền cộng tác",
        items: [
          {
            type: "toggle",
            label: "Cho phép thành viên mời người khác",
            sub: "Thành viên hiện tại có thể thêm người vào bảng.",
          },
          {
            type: "toggle",
            label: "Cho phép bình luận",
            sub: "Người xem có thể bình luận trên card.",
            defaultValue: true,
          },
        ],
      },
    ],
  },

  print: {
    title: "In, xuất và chia sẻ",
    subtitle: "Các tuỳ chọn in hoặc xuất dữ liệu của bảng.",
    sections: [
      {
        title: "Xuất dữ liệu",
        items: [
          {
            type: "option",
            label: "In bảng",
            sub: "Chuẩn bị bố cục để in toàn bộ board.",
          },
          {
            type: "option",
            label: "Xuất CSV",
            sub: "Xuất danh sách thẻ và trường dữ liệu ra CSV.",
          },
          {
            type: "option",
            label: "Xuất JSON",
            sub: "Sao lưu dữ liệu gốc của board.",
          },
        ],
      },
    ],
  },

  star: {
    title: "Gắn sao",
    subtitle: "Đưa bảng này vào danh sách yêu thích để truy cập nhanh.",
    sections: [
      {
        title: "Trạng thái yêu thích",
        items: [
          {
            type: "toggle",
            label: "Đánh dấu bảng là yêu thích",
            sub: "Hiển thị bảng trong starred boards.",
            defaultValue: true,
          },
          {
            type: "choice",
            label: "Mức ưu tiên hiển thị",
            options: ["Cao", "Trung bình", "Thấp"],
          },
        ],
      },
    ],
  },

  fields: {
    title: "Trường tùy chỉnh",
    subtitle: "Tạo thêm các field riêng cho card như text, số, ngày, dropdown.",
    sections: [
      {
        title: "Loại trường",
        items: [
          { type: "option", label: "Văn bản", sub: "Tạo trường text ngắn." },
          { type: "option", label: "Số", sub: "Dùng cho estimate, effort, cost..." },
          { type: "option", label: "Dropdown", sub: "Chọn từ danh sách giá trị." },
          { type: "option", label: "Ngày", sub: "Tạo field ngày tùy chỉnh." },
        ],
      },
      {
        title: "Tuỳ chọn",
        items: [
          {
            type: "toggle",
            label: "Hiển thị trường ngoài card",
            sub: "Cho phép xem nhanh ngay trên task card.",
          },
        ],
      },
    ],
  },

  automation: {
    title: "Tự động hóa",
    subtitle: "Tạo workflow tự động cho card và board.",
    sections: [
      {
        title: "Butler / Rule",
        items: [
          { type: "option", label: "Tạo rule", sub: "Tự động chạy hành động khi có sự kiện." },
          { type: "option", label: "Tạo button", sub: "Nút thao tác nhanh trên board hoặc card." },
          { type: "option", label: "Lịch biểu", sub: "Chạy hành động theo giờ hoặc ngày." },
        ],
      },
      {
        title: "Kích hoạt",
        items: [
          {
            type: "toggle",
            label: "Bật automation cho bảng",
            sub: "Cho phép toàn bộ workflow hoạt động.",
            defaultValue: true,
          },
        ],
      },
    ],
  },

  powerups: {
    title: "Tiện ích bổ sung",
    subtitle: "Kết nối các ứng dụng ngoài như Slack, Google Drive, Jira...",
    sections: [
      {
        title: "Power-Ups",
        items: [
          { type: "option", label: "Google Drive", sub: "Đính kèm file trực tiếp từ Drive." },
          { type: "option", label: "Slack", sub: "Chia sẻ card và nhận thông báo trong Slack." },
          { type: "option", label: "Calendar", sub: "Đồng bộ ngày hạn với lịch." },
        ],
      },
      {
        title: "Tuỳ chọn",
        items: [
          {
            type: "toggle",
            label: "Tự động gợi ý power-up phù hợp",
            sub: "Hiển thị đề xuất tiện ích theo loại board.",
          },
        ],
      },
    ],
  },

  labels: {
    title: "Nhãn",
    subtitle: "Quản lý nhãn và màu nhãn dùng cho thẻ.",
    sections: [
      {
        title: "Nhãn hiện có",
        items: [
          { type: "tagPreview", label: "UI", color: "#22c55e" },
          { type: "tagPreview", label: "Bug", color: "#ef4444" },
          { type: "tagPreview", label: "Backend", color: "#3b82f6" },
          { type: "tagPreview", label: "Ưu tiên", color: "#f59e0b" },
        ],
      },
      {
        title: "Tạo nhãn mới",
        items: [
          {
            type: "input",
            label: "Tên nhãn",
            placeholder: "Ví dụ: Blocked",
          },
          {
            type: "choice",
            label: "Màu nhãn",
            options: ["Xanh lá", "Vàng", "Xanh dương", "Đỏ", "Tím"],
          },
        ],
      },
    ],
  },

  stickers: {
    title: "Các nhãn dán",
    subtitle: "Thêm sticker hoặc biểu tượng vui nhộn cho thẻ.",
    sections: [
      {
        title: "Bộ sticker",
        items: [
          { type: "option", label: "Animals Pack", sub: "Các sticker động vật phổ biến." },
          { type: "option", label: "Productivity Pack", sub: "Biểu tượng task, focus, done." },
          { type: "option", label: "Celebration Pack", sub: "Sticker thưởng, hoàn thành, chiến thắng." },
        ],
      },
    ],
  },

  templates: {
    title: "Tạo mẫu",
    subtitle: "Biến board hoặc card thành template để tái sử dụng.",
    sections: [
      {
        title: "Mẫu bảng",
        items: [
          { type: "option", label: "Tạo mẫu từ board hiện tại", sub: "Giữ lại cấu trúc và cài đặt." },
          { type: "option", label: "Mẫu sprint", sub: "Khởi tạo nhanh cho sprint planning." },
        ],
      },
      {
        title: "Chia sẻ mẫu",
        items: [
          {
            type: "toggle",
            label: "Cho phép team dùng mẫu này",
            sub: "Hiển thị template cho các thành viên khác.",
          },
        ],
      },
    ],
  },

  activity: {
    title: "Hoạt động",
    subtitle: "Xem timeline thay đổi gần đây của board.",
    sections: [
      {
        title: "Bộ lọc",
        items: [
          {
            type: "choice",
            label: "Hiển thị",
            options: ["Tất cả", "Bình luận", "Di chuyển", "Hoàn thành"],
          },
          {
            type: "toggle",
            label: "Chỉ hiển thị hoạt động của tôi",
            sub: "Ẩn bớt thay đổi từ thành viên khác.",
          },
        ],
      },
      {
        title: "Nguồn cấp",
        items: [
          { type: "option", label: "12:40 - Minh cập nhật mô tả", sub: "Card Design Homepage" },
          { type: "option", label: "10:15 - Lan di chuyển thẻ", sub: "Từ Todo sang In Progress" },
        ],
      },
    ],
  },

  archive: {
    title: "Mục đã lưu trữ",
    subtitle: "Xem lại card hoặc list đã archive trước đó.",
    sections: [
      {
        title: "Danh sách đã lưu trữ",
        items: [
          { type: "option", label: "Archived card #1", sub: "Khôi phục hoặc xoá vĩnh viễn." },
          { type: "option", label: "Archived list Sprint 01", sub: "Mở lại danh sách cũ." },
        ],
      },
    ],
  },

  watch: {
    title: "Theo dõi",
    subtitle: "Cấu hình nhận thông báo về hoạt động của bảng.",
    sections: [
      {
        title: "Thông báo",
        items: [
          {
            type: "toggle",
            label: "Theo dõi toàn bộ bảng",
            sub: "Nhận thông báo khi có thay đổi quan trọng.",
            defaultValue: true,
          },
          {
            type: "toggle",
            label: "Thông báo qua email",
            sub: "Gửi email khi có activity lớn.",
          },
        ],
      },
    ],
  },

  collapse: {
    title: "Thu gọn tất cả danh sách",
    subtitle: "Tối ưu giao diện board khi có quá nhiều list hoặc card.",
    sections: [
      {
        title: "Chế độ hiển thị",
        items: [
          {
            type: "choice",
            label: "Tuỳ chọn",
            options: ["Giữ nguyên", "Thu gọn tất cả", "Mở tất cả"],
          },
          {
            type: "toggle",
            label: "Ẩn card đã hoàn thành",
            sub: "Giảm bớt chiều cao của list dài.",
          },
        ],
      },
    ],
  },

  copyBoard: {
    title: "Sao chép bảng thông tin",
    subtitle: "Tạo bản sao của board hiện tại với các tuỳ chọn dữ liệu.",
    sections: [
      {
        title: "Thông tin bản sao",
        items: [
          {
            type: "input",
            label: "Tên bảng mới",
            placeholder: "Bản sao của Sprint Board",
          },
          {
            type: "choice",
            label: "Sao chép nội dung",
            options: ["Chỉ cấu trúc", "Cấu trúc + thẻ", "Toàn bộ"],
          },
        ],
      },
      {
        title: "Tuỳ chọn",
        items: [
          {
            type: "toggle",
            label: "Giữ nguyên thành viên",
            sub: "Mời lại thành viên hiện tại sang board mới.",
          },
          {
            type: "toggle",
            label: "Giữ nhãn và checklist",
            sub: "Sao chép metadata chi tiết của thẻ.",
            defaultValue: true,
          },
        ],
      },
    ],
  },

  emailToBoard: {
    title: "Cài đặt Email-tới-bảng",
    subtitle: "Cho phép tạo thẻ bằng email và cấu hình list mặc định.",
    sections: [
      {
        title: "Địa chỉ nhận",
        items: [
          {
            type: "input",
            label: "Email bí mật của board",
            placeholder: "board+abc123@trello.example",
          },
          {
            type: "choice",
            label: "List mặc định",
            options: ["Hôm nay", "Tuần này", "Sau này"],
          },
        ],
      },
      {
        title: "Trạng thái",
        items: [
          {
            type: "toggle",
            label: "Bật Email-to-board",
            sub: "Cho phép tạo thẻ mới qua email.",
            defaultValue: true,
          },
        ],
      },
    ],
  },

  closeBoard: {
    title: "Đóng bảng thông tin",
    subtitle: "Đóng board để ẩn khỏi workspace nhưng vẫn có thể mở lại.",
    sections: [
      {
        title: "Lưu ý",
        items: [
          {
            type: "option",
            label: "Board sẽ không bị xoá ngay",
            sub: "Bạn vẫn có thể mở lại từ khu vực archived/closed.",
          },
          {
            type: "option",
            label: "Thành viên sẽ mất truy cập nhanh",
            sub: "Board sẽ bị ẩn khỏi danh sách chính.",
          },
        ],
      },
      {
        title: "Hành động",
        items: [
          {
            type: "danger",
            label: "Đóng bảng ngay",
          },
        ],
      },
    ],
  },
};