class Note {
  final int? id;
  String title;
  String content;
  DateTime? createdAt;

  Note({
    this.id,
    required this.title,
    required this.content,
    this.createdAt,
  });

  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      id: json['id'],
      title: json['title'],
      content: json['content'] ?? '',
      createdAt: json['created_at'] != null 
        ? DateTime.parse(json['created_at'])
        : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
    };
  }
} 