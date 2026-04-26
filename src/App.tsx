import { Header } from "./components/Header/Header"
import { ChatPage } from "./components/Chatarea/Chatpage"

export const App = () => {
  return (
    // 'overflow-hidden' prevents the whole page from scrolling
    <main className="flex flex-col h-screen w-full bg-(--bg) overflow-hidden">
      <Header />
      {/* 'flex-1' tells the chat page to take exactly what is left */}
      {/* 'min-h-0' is a CSS trick that allows flex children to shrink below their content size */}
      <section className="flex-1 min-h-0">
        <ChatPage />
      </section>
    </main>
  )
}