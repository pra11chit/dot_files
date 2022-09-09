call plug#begin('~/.config/nvim/plugged')
    " gruvbox colorscheme
    Plug 'sainnhe/gruvbox-material'
    " bottom line
    Plug 'itchyny/lightline.vim'
    " go
    Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }
    " ctrlp: vim-go uses for listing all function declarations
    Plug 'ctrlpvim/ctrlp.vim'
    " vs code like indent lines
    " Plug 'lukas-reineke/indent-blankline.nvim'
    call plug#end()

" plugin lightline
let g:lightline = {'colorscheme' : 'gruvbox_material'}

" plugin => vim-go
let g:go_highlight_functions = 1    " highlight functions
let g:go_highlight_methods = 1

inoremap jk <Esc>
vnoremap jk <Esc>

set completeopt=menuone,noinsert,noselect		" show pop up menu for auto completion, dont insert text until user selects the match, don't select match from menu

set mouse=a						    " enable mouse support in all modes

set splitright						" splitting window will put the new window to the right of current one
set splitbelow

set expandtab                       " replaces tabs with spaces
set tabstop=4						" move cursor 4 space when tab is pressed
set shiftwidth=4					" shift 4 space when indenting

set number
syntax on

set ignorecase                      " ignore case in search patterns
set smartcase                       " ignore the ignorecase option if the search pattern contains uppercase character(s)

set diffopt+=vertical               " start diff mode with vertical splits

set signcolumn=auto                 " see neovim doc: sign

filetype plugin indent on           " detects filetype and associated indent

" colors
if (has('termguicolors'))
    set termguicolors
endif

" Set contrast.
" This configuration option should be placed before `colorscheme gruvbox-material`.
" Available values: 'hard', 'medium'(default), 'soft'
let g:gruvbox_material_background = 'soft'
" For better performance
let g:gruvbox_material_better_performance = 1
colorscheme gruvbox-material
set background=dark
"
" https://github.com/overcache/NeoSolarized
" colorscheme NeoSolarized
let g:neosolarized_termBoldAsBright = 1


hi MatchParen guibg=white ctermbg=black


let g:netrw_banner=0

let g:mardown_fenced_languages = ['javascript', 'js=javascript', 'json=javascript', 'python', 'go']         " this enables syntax highlighting for ``` code blocks for this langs in markdown

let mapleader = " "                 " use space as leader key (<leader>). <blahblah> specifies blahblah key

" close window
" nnoremap <leader>q :q<CR>

nnoremap <leader>v :e $MYVIMRC<CR>

" [vim-go]
    " Go syntax highlighting
    let g:go_highlight_fields = 1
    let g:go_highlight_functions = 1
    let g:go_highlight_function_calls = 1
    let g:go_highlight_types = 1
    let g:go_highlight_extra_types = 1
    let g:go_highlight_operators = 1

    " automatically show func signature when cursor
    let g:go_auto_type_info = 1

    " use goimports instead of gofmt as it automatically adds imports after save
    let g:go_fmt_command = "goimports"

    " automatically highlight matching identifiers
    let g:go_auto_sameids = 1
    
    " pop up window for documentation instead of separate window
    " use q to close
    let g:go_doc_popup_window = 1

    " text objects
    " dif/vif/yif : delete/select/copy inside of functions
    " daf/vaf/yaf : around the function

    " code navigation
    " gd : go to definition
    " ctrl-o : to jump back previous location
    " ctrl-t : vim-go specific to jump back previous location (better)

    " automatically save whenever vim-go calls make
    set autowrite

    " mappings for build, run, test
    autocmd FileType go nmap <leader>t <Plug>(go-test)
    autocmd FileType go nmap <leader>b <Plug>(go-build)
    autocmd FileType go nmap <leader>r <Plug>(go-run)

    " show func signature
    " shortcut Shift-k can also be used
    autocmd FileType go nmap <leader>i :GoInfo<CR>

    " GoRename
    autocmd FileType go nmap <leader>e <Plug>(go-rename)

    " jump between errors
    map <C-n> :cnext<CR>
    map <C-p> :cprevious<CR>
    nnoremap <leader>a :cclose<CR>      " closes the error window

    " Auto formatting and importing
    let g:go_fmt_autosave = 1

" for markdown use glow
