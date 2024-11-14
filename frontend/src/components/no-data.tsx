interface NoDataProps extends React.PropsWithChildren {}

const NoDataComponent: React.FC<NoDataProps> = (props: NoDataProps) => {
    return (
        <div className="flex flex-wrap-reverse justify-center items-center min-h-80">
            <h1 className="mb-2 cursor-text text-xl font-light dark:text-dark-primary">
                {props.children}
            </h1>
        </div>
    );
}

export default NoDataComponent;