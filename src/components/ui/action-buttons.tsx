
import React from 'react';
import { Button } from './button';
import { X, Trash, Edit, Plus, Copy } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const DeleteButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  title = 'Delete',
  disabled = false,
  size = 'icon',
}) => (
  <Button
    variant="ghost"
    size={size}
    onClick={onClick}
    className={`text-gray-500 hover:text-red-500 ${className || ''}`}
    title={title}
    disabled={disabled}
    type="button"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">{title}</span>
  </Button>
);

export const TrashButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  title = 'Delete',
  disabled = false,
  size = 'icon',
}) => (
  <Button
    variant="ghost"
    size={size}
    onClick={onClick}
    className={`text-gray-500 hover:text-red-500 ${className || ''}`}
    title={title}
    disabled={disabled}
    type="button"
  >
    <Trash className="h-4 w-4" />
    <span className="sr-only">{title}</span>
  </Button>
);

export const EditButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  title = 'Edit',
  disabled = false,
  size = 'icon',
}) => (
  <Button
    variant="ghost"
    size={size}
    onClick={onClick}
    className={`text-gray-500 hover:text-blue-500 ${className || ''}`}
    title={title}
    disabled={disabled}
    type="button"
  >
    <Edit className="h-4 w-4" />
    <span className="sr-only">{title}</span>
  </Button>
);

export const AddButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  title = 'Add',
  disabled = false,
  size = 'icon',
}) => (
  <Button
    variant="ghost"
    size={size}
    onClick={onClick}
    className={`text-gray-500 hover:text-green-500 ${className || ''}`}
    title={title}
    disabled={disabled}
    type="button"
  >
    <Plus className="h-4 w-4" />
    <span className="sr-only">{title}</span>
  </Button>
);

export const DuplicateButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  title = 'Duplicate',
  disabled = false,
  size = 'icon',
}) => (
  <Button
    variant="ghost"
    size={size}
    onClick={onClick}
    className={`text-gray-500 hover:text-purple-500 ${className || ''}`}
    title={title}
    disabled={disabled}
    type="button"
  >
    <Copy className="h-4 w-4" />
    <span className="sr-only">{title}</span>
  </Button>
);
