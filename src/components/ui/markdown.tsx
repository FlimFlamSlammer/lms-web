import { default as ReactMarkdown } from "react-markdown";

export type MarkdownProps = {
    children?: string;
};

export const Markdown = ({ children }: MarkdownProps) => {
    return (
        <ReactMarkdown
            components={{
                ul(props) {
                    return <ul className="ml-6 list-disc mb-4" {...props} />;
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
